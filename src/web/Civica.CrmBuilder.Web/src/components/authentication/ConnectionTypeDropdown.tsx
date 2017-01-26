import { IDropdownOptionItem } from '../forms/DropdownOptions';
import * as ApiClient from '../../../../../api/ApiClient';

export class ConnectionTypeDropdown {
    static Options(): Array<IDropdownOptionItem> {
        let options = new Array<IDropdownOptionItem>();
        options.push({ value: ApiClient.AuthenticationType.Dynamics365, displayName: 'Dynamics 365' });
        options.push({ value: ApiClient.AuthenticationType.Ifd, displayName: 'Internet facing deployment (IFD)' });
        options.push({ value: ApiClient.AuthenticationType.OnPremise, displayName: 'On premise' });

        return options;
    }
}
