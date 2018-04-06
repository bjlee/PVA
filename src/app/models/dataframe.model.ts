import {Column} from './column.model';

export interface Dataframe {
    readonly id: string;
    readonly name: string;
    readonly rowCount: number;
    readonly partitionCount: number;
    readonly columns: Column[];
}
