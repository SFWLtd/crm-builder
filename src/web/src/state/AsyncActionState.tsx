export interface IAsyncActionState<TResult> {
    hasStarted: boolean;
    hasCompleted: boolean;
    result: TResult;
}
