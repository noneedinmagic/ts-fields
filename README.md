# TypeScript class fields decorators collection

This collection contains some decorators for TypeScript classes in order to shortcut existing decorators from existing libraries such as `class-transformer` or `typeorm`.

## Installation

```sh
npm install @noneedinmagic/ts-fields --save
```

## Usage

```ts
import { Type } from 'class-transformer';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DatetimeMomentField } from '@noneedinmagic/ts-fields';

export type OrderStatus = unknown;  // your types

export class OrderItem {
    // ...
}

export class Order {
  public id: number;

  public status: OrderStatus;

  @Type(() => moment)
  @DatetimeMomentField()
  public time: Moment;

  @Type(() => OrderItem)
  public items?: OrderItem[];

  public count: number;

  public total: number;
}
```