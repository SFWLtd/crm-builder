export interface IAsyncActionState<TResult> {
    hasStarted: boolean;
    hasCompleted: boolean;
    latestMessage: string;
    result: TResult,
}
