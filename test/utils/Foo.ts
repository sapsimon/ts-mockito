function then() {
    // Nothing
}

export class Foo {
    public dynamicMethod: Function;
    public dynamicMethodInFunction: Function;

    constructor() {
        this.dynamicMethod =  () => {
            then();
        };
    }

    public getBar(): string {
        this.dynamicMethodInFunction = () => {
            then();
        };
        return "bar";
    }

    public concatStringWithNumber(sampleString: string, sampleNumber: number): string {
        return sampleString + sampleNumber;
    }

    public convertNumberToString(value: number): string {
        return value.toString();
    }

    public getStringById(value: number): string {
        return value.toString();
    }

    public sumTwoNumbers(a: number, b: number): number {
        return a + b;
    }

    public sampleMethodWithOptionalArgument(a: number, b?: number): number {
        return a + b;
    }

    public sampleMethodWithTwoOptionalArguments(a?: number, b?: number): number {
        return a + b;
    }

    public sampleMethodReturningPromise(value: string): Promise<string> {
        return Promise.resolve(value);
    }

    public sampleMethodReturningVoidPromise(value: string): Promise<void> {
        return Promise.resolve();
    }

    public async sampleMethodReturningVoidPromiseWithoutParams(): Promise<void> {
        return Promise.resolve();
    }

    public async sampleMethodWithObjectArguments(obj: object): Promise<void> {
        return Promise.resolve();
    }
}
