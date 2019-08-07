import { Container } from "inversify";
import { AmiibosModule } from "../../amiibos/AmiibosModule";

export const container = new Container({ defaultScope: 'Singleton' });

container.load(AmiibosModule);
