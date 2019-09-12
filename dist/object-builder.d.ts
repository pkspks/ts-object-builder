export declare class ObjectBuilderBase<T, K extends keyof T> {
    protected createType: new (arg?: any) => T;
    private readonly values;
    private readonly fieldsToExclude;
    constructor(createType: new (arg?: any) => T);
    private readonly fieldsToBuild;
    private isNotExcluded;
    private buildForIndex;
    protected createNewObject(): T;
    with<KType extends K>(name: KType, value: ((index: number) => T[KType]) | T[KType]): this;
    build(): T;
    buildList(count: number): T[];
    without(...fieldsToExclude: K[]): this;
}
export declare class ObjectBuilder<T> extends ObjectBuilderBase<T, keyof T> {
}
