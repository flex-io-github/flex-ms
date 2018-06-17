export interface IFormProps<T>{
    save: (entity: T) => void
    defaultValues: T
}