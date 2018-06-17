import * as _ from "lodash"
import { ITask } from '../models';
import { ICrudMapper, CrudMapperBase } from '../dataSource/base'

export class TaskMapper extends CrudMapperBase<ITask> implements ICrudMapper<ITask> {
    toViewModelList(data: any): ITask[] {
         return _.chain(data)
            // .mapValues((employee, id) => _.merge(employee, { id }))
            .toArray()
            .value() as ITask[];
    }

    toViewModel(id: string, student: ITask): ITask {
        return _.assign({}, student, { id })  as ITask;
    }
}
