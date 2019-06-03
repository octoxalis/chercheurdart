class KVIdb
{
  constructor ( db_s='kv_db', store_s='kv_store', version=1 )
  {
    this.idb     = null
    this.idb_s   = db_s
    this.store   = store_s
    this.version = version
    this.ready   = null

    this.init()
  }

  init ()
  {
    this.ready = new Promise( ( resolve, reject ) =>
    {
      const request = window.indexedDB.open( this.idb_s, this.version )

      request.onupgradeneeded = req_e => 
      {
        this.idb = req_e.target.result
        this.idb.createObjectStore( this.store )
      }

      request.onsuccess = req_e =>
      {
        this.idb = req_e.target.result
        resolve( req_e.target.result )    //: only to complete because we dont use result but this.idb in transactions
      }

      request.onerror = req_e =>  reject( req_e.target.error )
    })
  }

  get ( key )
  {
    return this.ready
      .then( () => 
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readonly'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .get( key )

          request.onsuccess = req_e => resolve( req_e.target.result )

          request.onerror = reject
        })
      })
  }


  walk ( callback_f )
  {
    return this.ready
      .then( () => 
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readonly'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .openCursor()
          request.onsuccess = req_e =>
          {
            let cursor = req_e.target.result
            if ( cursor )
            {
              callback_f( cursor.key, cursor.value )
              cursor.continue()
            }
            else resolve()
          }
  
          request.onerror = reject
        })
      })
  }

  last ()
  {
    return this.ready
      .then( () => 
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readonly'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .openCursor( null, 'prev' )

          request.onsuccess = req_e =>
          {
            if ( req_e.target.result ) resolve( req_e.target.result.value )
          }

          request.onerror = reject
        })
      })
  }


  set ( key, value )
  {
    return this.ready
      .then( () =>
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readwrite'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .put( value, key )

          request.onsuccess = resolve    //: nothing to do

          request.onerror = reject
        })
      })
  }

  update ( key, property, value )
  {
    return this.ready
      .then( () =>
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readwrite'
          const store = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
          const getRequest = store.get( key )

          getRequest.onsuccess = () =>
          {
            const item_o = getRequest.result
            item_o[property] = value
            const putRequest = store.put( item_o, key )

            putRequest.onsuccess = resolve
            
            putRequest.onerror = reject
          }
          getRequest.onerror = reject
        })
      })
  }

  deleteAll ( callback_f )
  {
    return this.ready
      .then( () => 
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readwrite'
          const store = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
          const request = store.openCursor()

          request.onsuccess = req_e =>
          {
            let cursor = req_e.target.result
            let item_o
            if ( cursor )
            {
              item_o = cursor.value
              if ( callback_f( item_o ) ) store.delete( cursor.key )
              cursor.continue()
            }
            else resolve
          }
  
          request.onerror = reject
        })
      })
  }

  delete ( key )
  {
    return this.ready
      .then( () =>
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readwrite'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .delete( key )

          request.onsuccess = resolve    //: nothing to do

          request.onerror = reject
        })
      })
  }

  clear ()
  {
    return this.ready
      .then( () =>
      {
        return new Promise( ( resolve, reject ) =>
        {
          const mode = 'readwrite'
          const request = this.idb.transaction( [ this.store ], mode ).objectStore( this.store )
            .clear()

          request.onsuccess = resolve    //: nothing to do

          request.onerror = reject
        })
      })
  }

  deleteIDB ()
  {
    window.indexedDB.deleteDatabase( this.idb_s )
  }
}