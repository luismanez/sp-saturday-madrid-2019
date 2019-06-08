import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, ServiceScope } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'ScopedCounterWebPartStrings';
import ScopedCounter from './components/ScopedCounter';
import { IScopedCounterProps } from './components/IScopedCounterProps';
import { ICounterService } from '../../services/ICounterService';
import { CounterServiceKey } from '../../services/CounterService';
import Counter from '../counter/components/Counter';
import { DoubleCounterService, DoubleCounterServiceKey } from '../../services/DoubleCounterService';

export interface IScopedCounterWebPartProps {
  description: string;
}

export default class ScopedCounterWebPart extends BaseClientSideWebPart<IScopedCounterWebPartProps> {

  public render(): void {

    const serviceScope: ServiceScope = this.context.serviceScope.startNewChild();
    const scopedCounterServiceInstance: ICounterService = serviceScope.createDefaultAndProvide(DoubleCounterServiceKey);
    serviceScope.finish();

    const element: React.ReactElement<IScopedCounterProps > = React.createElement(
      Counter,
      {
        description: this.properties.description,
        counterService: scopedCounterServiceInstance
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
