export class ObjectBuilderBase<T, K extends keyof T> {
    private readonly values: Map<K, (index: number) => T[K]> = new Map<K, (index: number) => T[K]>();
    private readonly fieldsToExclude: Array<(keyof T)> = [];

    constructor(protected createType: new (arg?: any) => T) {
    }

    private get fieldsToBuild(): K[] {
        return Array.from(this.values.keys()).filter((f) => this.isNotExcluded(f));
    }

    private isNotExcluded(field: K): boolean {
        return this.fieldsToExclude.indexOf(field) === -1;
    }

    private buildForIndex(index: number = 0): T {
      const obj = this.createNewObject();

      this.fieldsToBuild.forEach((k) => {
        obj[k] = this.values.get(k)(index);
      });

      return obj;
    }

    protected createNewObject(): T {
        return new this.createType();
    }

    with<KType extends K>(name: KType, value: ((index: number) => T[KType]) | T[KType]): this {
        if (typeof value === 'function') {
            this.values.set(name, value as ((index: number) => T[KType]));
        } else {
            this.values.set(name, () => value);
        }
        return this;
    }

    build(): T {
        return this.buildForIndex(0);
    }

    buildList(count: number): T[] {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(this.buildForIndex(i));
        }
        return list;
    }

    without(...fieldsToExclude: K[]): this {
        this.fieldsToExclude.push(...fieldsToExclude);
        return this;
    }
}

export class ObjectBuilder<T> extends ObjectBuilderBase<T, keyof T> {
}
