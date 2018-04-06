export interface Column {
    readonly id: string;
    readonly name: string;
    readonly type: string;
    readonly isCategorical: boolean;
    readonly isContinuous: boolean;
    readonly isDiscrete: boolean;
}
