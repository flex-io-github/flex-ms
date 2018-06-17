import axios from "axios"
import { ICrud } from "./ICrud"
import { ICrudConfig } from "./ICrudConfig"
import { ICrudMapper } from "./ICrudMapper"
import { IDbEntity } from "./IDbEntity"
// const Promise = require("promise")
// const request = require("superagent-promise")(require("superagent"), Promise)
import { environment } from "../../../build_params"
import { getAccessToken } from "../../../util/access_token_utils"
import _ from "lodash"

export class CrudGeneric<T extends IDbEntity> implements ICrud<T> {
    protected endPointUrl: string
    protected collectionName: string
    protected mapper: ICrudMapper<T>
    protected userId: string | number | any

    private _axios = axios.create({
        baseURL: this.endPointUrl,

        headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json-patch+json",
            Authorization: "Bearer" + getAccessToken(),
        },
    })

    authHeader = () => {
        return { Authorization: "Bearer " + getAccessToken() }
    }

    constructor(crudConfig: ICrudConfig, mapper: ICrudMapper<T>) {
        this.endPointUrl = crudConfig.endPointUrl
        this.collectionName = crudConfig.collectionName
        this.mapper = mapper
        this.userId = 2
    }

    getAll = (): Promise<T[]> => {
        return axios
            .get(`${this.endPointUrl}/${this.collectionName}`)
            .then(response => this.mapper.toViewModelList(response.data))
            .catch(error => {
                throw error
            })

        // return (
        //     request
        //         .get(`${this.endPointUrl}/${this.collectionName}`)
        //         .set("Content-Type", "application/json")
        //         // .type("application/json")
        //         // .accept("application/json")
        //         .then((res: Resp) => {
        //             // console.log(res)
        //             this.mapper.toViewModelList(res.text)
        //             // handleResp(res)
        //         })
        //         .catch((res: Resp) => handleResp(res))
        // )
    }
    add(entity: T): Promise<T> {
        entity = _.assign({}, entity, {
            user_id: this.userId,
        })
        return this._axios
            .post(`${this.endPointUrl}/${this.collectionName}`, entity)
            .then(response => response.data)
            .catch(error => {
                throw error
            })
    }

    remove(id: string): Promise<string> {
        return axios
            .delete(`${this.endPointUrl}/${this.collectionName}/${id}`)
            .then(() => id)
    }
    get(id: string): Promise<T> {
        return axios
            .get(`${this.endPointUrl}/${this.collectionName}/${id}`)
            .then(response => this.mapper.toViewModel(id, response.data))
    }

    update(entity: T): Promise<T> {
        // const entityId = entity.id;
        // entity = this.mapper.removeId(entity);
        entity = _.assign({}, entity, {
            user_id: this.userId,
        })
        return axios
            .put(
                `${this.endPointUrl}/${this.collectionName}/${entity.id}`,
                entity,
            )
            .then(response => response.data)
    }
}
