// import 'package:flutterapp/org/domain/entities/commons/app_user_type.dart';
// import 'package:flutterapp/org/domain/entities/commons/reg_user.dart';
// import 'package:flutterapp/org/domain/entities/commons/user_base.dart';

import { AppUserType } from "./AppUserType";
import { RegUser, type RegUserProps } from "./RegUser";

type NoAuthUserProps = RegUserProps & {

}

export class NoAuthUser extends RegUser {

    constructor(props: NoAuthUserProps) {
        super(props);
    }

    getAppUserType(): AppUserType {
        return AppUserType.NO_AUTH;
    }

}