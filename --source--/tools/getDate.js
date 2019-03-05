module.exports =
{
  getLocaleDate: () =>
  {
    const rawNow = new Date()
    const yearNow = rawNow.getFullYear()
    const rawMonth = rawNow.getMonth() + 1
    const monthNow = ( rawMonth < 10 ) ? `0${rawMonth}` : `${rawMonth}`
    const rawDay = rawNow.getDate()
    const dayNow = ( rawDay < 10 ) ? `0${rawDay}` : `${rawDay}`
    const now_s = `${yearNow}-${monthNow}-${dayNow}`
    const locale_s = rawNow.toLocaleDateString( 'fr-FR', { year: 'numeric', month: 'long', day: 'numeric' } )    //;console.log( `date: ${dateNow} -- ${today}` )
    return { now_s: now_s, locale_s: locale_s }
  }
}