import * as _ from "lodash"
import { IClient } from '../models';
import { ICrudMapper, CrudMapperBase } from '../dataSource/base'

export class ClientMapper extends CrudMapperBase<IClient> implements ICrudMapper<IClient> {
    toViewModelList(data: any): IClient[] {
         return _.chain(data)
            // .mapValues((employee, id) => _.merge(employee, { id }))
            .toArray()
            .value() as IClient[];
    }

    toViewModel(id: string, student: IClient): IClient {
        return _.assign({}, student, { id })  as IClient;
    }
}
