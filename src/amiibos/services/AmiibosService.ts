import { AmiiboModel } from "./AmiibosModel";
import { amiiboList } from './lineup.model.json';
import { injectable } from "inversify";
import { Observable, from } from "rxjs";
import { map, tap } from "rxjs/operators";

@injectable()
export class AmiibosService {

  /**
   * Gets the list of Amiibos Series available.
   *
   * @returns The series available.
   */
  public getAmiiboSeries(): Observable<Array<string>> {
    return this.loadAmiibos().pipe(
      map(amiibos => amiibos
        .map(amiibo => amiibo.series)
        .filter((series: string | null): series is string => !!series)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
      ),
      tap(console.log)
    );
  }

  /**
   * Gets all of the available amiibos.
   *
   * @returns All available amiibos.
   */
  public getAmiibos(): Observable<Array<AmiiboModel>> {
    return this.loadAmiibos();
  }

  /**
   * Gets the collection of Amiibos that belong to the specified series.
   *
   * @param series - The name of the series to filter by.
   * @returns The Amiibos that belong to specified series.
   */
  public getAmiibosBySeries(series: string): Observable<Array<AmiiboModel>> {
    return this.loadAmiibos().pipe(
      map(amiibos => amiibos.filter(amiibo => amiibo.series === series)),
      tap(console.log)
    );
  }

  /**
   * Finds the Amiibo with the provided slug.
   *
   * @param slug The unique identifier of the Amiibo.
   * @returns The matching Amiibo.
   */
  public getAmiiboBySlug(slug: string): Observable<AmiiboModel> {
    return this.loadAmiibos().pipe(
      map(amiibos => amiibos.find(amiibo => amiibo.slug === slug)),
      map(amiibo => {
        if(!amiibo) {
          throw new Error(`Unabled to find amiibo "${slug}`)
        }
        return amiibo;
      }),
      tap(console.log)
    );
  }

  /**
   * Loads Amiibos data from the raw data source.
   *
   * @returns The complete collection of Amiibos.
   */
  private loadAmiibos(): Observable<Array<AmiiboModel>> {
    const amiibos = amiiboList
      .filter(amiibo => amiibo.type === 'Figure')
      .map(amiibo => ({
        slug: amiibo.slug,
        name: amiibo.amiiboName
          .replace('&#8482;', '')
          .replace('&#174;', ''),
        description: amiibo.overviewDescription,
        series: amiibo.series,
        figureUrl: `https://www.nintendo.com/${amiibo.figureURL}`,
        releaseDate: amiibo.releaseDateMask
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return from([amiibos]);
  }
}