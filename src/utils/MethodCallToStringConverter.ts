import {Matcher} from "../matcher/type/Matcher";
import {MethodAction} from "../MethodAction";
import {MethodToStub} from "../MethodToStub";

export class MethodCallToStringConverter {
    public convert(method: MethodToStub): string {
        const stringifiedMatchers = method.matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${method.name}(${stringifiedMatchers})" `;
    }

    public convertActualCalls(calls: MethodAction[]): string[] {
        return calls.map(call => {
            const methodName = call.methodName;
            const args = call.args.map(arg => {
                if (arg.hasOwnProperty('toString')) {
                    return arg.toString();
                } else {
                    return JSON.stringify(arg);
                }
            });
            return `${methodName}(${args.join(', ')})`;
        });
    }
}
