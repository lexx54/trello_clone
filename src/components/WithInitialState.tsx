import { useState, useEffect, ComponentType } from "react"
import { AppState } from "../state/AppStateReducer"
import { load } from '../services/api'

type InjectedProps = {
  initialState: AppState,
}

export function withInitialState<TProps>(
  WrappedComponent: ComponentType<TProps & InjectedProps>
) {
  return (props: Omit<TProps, keyof InjectedProps>) => {
    const [initialState, setInitialState] = useState<AppState>({
      lists: [],
      draggedItem: null,
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | undefined>()

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const data = await load()
          setInitialState(data)
        } catch (e: any) {
          setError(e)
        }
        setIsLoading(false)
      }
      fetchInitialState()
    }, [])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    return (
      <WrappedComponent
        {...props as TProps}
        initialState={initialState}
      />
    )
  }
}