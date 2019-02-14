class DOM_FeColorMatrix
{
  constructor ( filterID, animateID, animate_a )
  {
    this._animateID = animateID || 'ca_animate'
    this._filter_e = document.getElementById( filterID )
    this.createMatrix( animate_a )
  }

  toMatrix ( rgb_o )
  {
    const from_s = `${rgb_o.r0} 0 0 0 0    0 ${rgb_o.g0} 0 0 0    0 0 ${rgb_o.b0} 0 0    0 0 0 1 0`
    const to_s   = `${rgb_o.r1} 0 0 0 0    0 ${rgb_o.g1} 0 0 0    0 0 ${rgb_o.b1} 0 0    0 0 0 1 0`
    return { from_s: from_s, to_s: to_s }
  }
  
  toBegin ( previousID, delay )
  {
    let begin_s = ( delay !== undefined ) ? `${delay}s;` : ``
    if ( previousID !== undefined ) begin_s += `${previousID}.end`
    return begin_s
  }
  
  toDuration ( dur_o )
  {
    return `${dur_o.d}s`
  }
  
  createAnimate ( index, anim_a )
  {
    const anim_e = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
    anim_e.setAttribute( 'id', `${this._animateID}_${index}` )
    anim_e.setAttribute( 'attributeType', 'XML' )
    anim_e.setAttribute( 'attributeName', 'values' )
    anim_e.setAttribute( 'dur', this.toDuration( anim_a ) )
    anim_e.setAttribute( 'repeatCount', 1 )
    let from_s, to_s
    ( {from_s, to_s } = this.toMatrix( anim_a ) )
    anim_e.setAttribute( 'from', from_s )
    anim_e.setAttribute( 'to', to_s )
    return anim_e
  }
  
  createMatrix ( animate_a )
  {
    const lastIndex = animate_a.length - 1
    for (let at = 0; at <= lastIndex; ++at )
    {
      const animate_e = this.createAnimate( at, animate_a[at])
      const begin_s = ( at === 0 ) ? this.toBegin( `${this._animateID}_${lastIndex}`, 0 ) : this.toBegin( `${this._animateID}_${at - 1}` )
      animate_e.setAttribute( 'begin', begin_s )
      this._filter_e.appendChild( animate_e )
    }
  }
}
