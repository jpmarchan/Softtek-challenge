export interface IHttpRepository {
    listPeopleFromSwapi(index: string): Promise<any>;
}
