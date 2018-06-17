import React from 'react'
import { Breadcrumb, autobind, IBreadcrumbItem } from 'office-ui-fabric-react';

export class Dashboard extends React.Component<{}, {}>{

    private _onBreadcrumbItemClicked = (ev: React.MouseEvent<HTMLElement>, item: IBreadcrumbItem): void => {
        console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
      }

    render(){
        return(
            <div>
                <div>Welcome to Dashboard</div>
            </div>
        )
    }
}