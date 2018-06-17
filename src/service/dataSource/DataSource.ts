
// import { EmployeeDataSource } from './dsEntities/EmployeeDataSource';
import * as mapper from '../mappers';
import * as model from '../models';

import { CrudGeneric } from '../../service/dataSource/base';


export class ClientDataSource extends CrudGeneric<model.IClient> {}
export class TaskDataSource extends CrudGeneric<model.ITask> {}
export class ProjectDataSource extends CrudGeneric<model.IProject> {}

const endPointUrl = 'http://localhost:5000/api';

export class DataSource {
    static clients: ClientDataSource = new ClientDataSource({
        endPointUrl,
        collectionName: 'clients'
    }, new mapper.ClientMapper());

    static tasks: TaskDataSource = new TaskDataSource({
        endPointUrl,
        collectionName: 'tasks'
    }, new mapper.TaskMapper());

    static projects: ProjectDataSource = new ProjectDataSource({
        endPointUrl,
        collectionName: 'projects'
    }, new mapper.ProjectMapper());
    // static employment_types: EmploymentTypeDataSource = new EmploymentTypeDataSource({
    //     endPointUrl,
    //     collectionName: 'employment_types'
    // }, new mapper.EmploymentTypeMapper());
}