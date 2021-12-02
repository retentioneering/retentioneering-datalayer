/**
 * By Alexey Avramenko and Retentioneering Team
 * Copyright (C) 2020 Maxim Godzi, Anatoly Zaytsev, Retentioneering Team
 * This Source Code Form is subject to the terms of the Retentioneering Software Non-Exclusive, Non-Commercial Use License (License)
 * By using, sharing or editing this code you agree with the License terms and conditions.
 * You can obtain License text at https://github.com/retentioneering/retentioneering-dom-observer/blob/master/LICENSE.md
 */
export type EndpointOptions<E> = {
  name: string
  fraction?: number
}

export type BaseEvent<Type extends string, Data> = {
  type: Type
  name: string
  data: Data
  endpointsOptions?: EndpointOptions<BaseEvent<Type, Data>>[]
}
