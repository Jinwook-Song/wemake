import type { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router';

export namespace Route {
  export type LoaderArgs = LoaderFunctionArgs;
  export type ActionArgs = ActionFunctionArgs;

  export interface ComponentProps<T = any, U = any> {
    loaderData: T;
    actionData?: U;
  }
}
