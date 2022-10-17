import {Matcher} from "../matcher/type/Matcher";
import {MethodAction} from "../MethodAction";
import {MethodToStub} from "../MethodToStub";
import * as safeJsonStringify from "safe-json-stringify";

export class MethodCallToStringConverter {
    public convert(method: MethodToStub): string {
        const stringifiedMatchers = method.matchers.map((matcher: Matcher) => matcher.toString()).join(", ");
        return `${method.name}(${stringifiedMatchers})" `;
    }

    public convertActualCalls(calls: MethodAction[]): string[] {
        return calls.map(call => {
            const methodName = call.methodName;
            const args = call.args.map(arg => {
                if (typeof arg !== 'object' || arg.hasOwnProperty('toString')) {
                    return arg.toString();
                } else {
                    return safeJsonStringify(arg);
                }
            });
            return `${methodName}(${args.join(', ')})`;
        });
    }
}
