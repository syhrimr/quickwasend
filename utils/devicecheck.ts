export default function devicecheck(): boolean {
  // the logic here is every device that has
  // less than 800x600 resolution considered as mobile
  const isMobile = ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 );

  return { isMobile };
}