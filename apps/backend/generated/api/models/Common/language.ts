import type { Name } from './name';

/**
 * Languages for translations of API resource information
 */
export interface Language {
  /** The identifier for this resource */
  id: number;
  /** The two-letter code of the language. Note that it is not unique */
  iso3166: string;
  /** The two-letter code of the country where this language is spoken. Note that it is not unique */
  iso639: string;
  /** The name for this resource  */
  name: string;
  /** The name of this resource listed in different languages */
  names: Name[];
  /** Whether or not the games are published in this language */
  official: boolean;
}
