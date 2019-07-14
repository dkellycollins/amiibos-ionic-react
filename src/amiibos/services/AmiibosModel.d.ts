export interface AmiiboModel {
  /**
   * Unique identifier of the Amiibo.
   */
  slug: string;

  /**
   * Display name for the Amiibo figure.
   */
  name: string;

  /**
   * Additional information about the Amiibo figure.
   */
  description: string;

  /**
   * The name of the series the Amiibo belongs too.
   */
  series: string | null;
  
  /**
   * The full url to the image for the Amiibo figure.
   */
  figureUrl: string;

  /**
   * The date when the Amiibo figure was released.
   */
  releaseDate: string;
}