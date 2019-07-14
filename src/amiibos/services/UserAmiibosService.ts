import { injectable } from "inversify";
import { BehaviorSubject, Observable } from "rxjs";
import { skip, map } from 'rxjs/operators';

@injectable()
export class UserAmiibosService {

  private readonly collectedAmiibos$: BehaviorSubject<Record<string, boolean>>;

  public constructor() {
    this.collectedAmiibos$ = new BehaviorSubject<Record<string, boolean>>(this.load());
    this.collectedAmiibos$.pipe(skip(1)).subscribe(this.save.bind(this));
  }

  public getCollectedAmiibos(): Observable<Array<string>> {
    return this.collectedAmiibos$.pipe(
      map(collectedAmiibos => Object.entries(collectedAmiibos).filter(([_, collected]) => collected).map(([m]) => m)),
    );
  }

  public toggleAmiibo(slug: string, collected: boolean) {
    this.collectedAmiibos$.next({
      ...this.collectedAmiibos$.getValue(),
      [slug]: collected
    });
  }

  private save(collectedAmiibos: Record<string, boolean>) {
    try {
      localStorage.setItem('UserAmiibosService.collectedAmiibos', JSON.stringify(collectedAmiibos));
    } catch (error) {
      console.error(error);
    }
  }

  private load(): Record<string, boolean> {
    try {
      const data = localStorage.getItem('UserAmiibosService.collectedAmiibos');

      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}