class ObjectBuilderBase<T, K extends keyof T> {
    private readonly values: Map<K, () => T[K]> = new Map<K, () => T[K]>();
    private readonly fieldsToExclude: Array<(keyof T)> = [];

    constructor(protected createType: new (arg?: any) => T) {
    }

    private get fieldsToBuild(): K[] {
        return Array.from(this.values.keys()).filter((f) => this.isNotExcluded(f));
    }

    private isNotExcluded(field: K): boolean {
        return this.fieldsToExclude.indexOf(field) === -1;
    }

    private createNewObject(): T {
        return new this.createType();
    }

    with<KType extends K>(name: KType, value: (() => T[KType]) | T[KType]): this {
        if (typeof value === 'function') {
            this.values.set(name, value);
        } else {
            this.values.set(name, () => value);
        }
        return this;
    }

    build(): T {
        const obj = this.createNewObject();

        this.fieldsToBuild.forEach((k) => {
            obj[k] = this.values.get(k)();
        });

        return obj;
    }

    buildList(count: number): T[] {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push(this.build());
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
