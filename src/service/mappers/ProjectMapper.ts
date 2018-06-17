import * as _ from "lodash"
import { IProject } from '../models';
import { ICrudMapper, CrudMapperBase } from '../dataSource/base'

export class ProjectMapper extends CrudMapperBase<IProject> implements ICrudMapper<IProject> {
    toViewModelList(data: any): IProject[] {
         return _.chain(data)
            // .mapValues((employee, id) => _.merge(employee, { id }))
            .toArray()
            .value() as IProject[];
    }

    toViewModel(id: string, student: IProject): IProject {
        return _.assign({}, student, { id })  as IProject;
    }
}
