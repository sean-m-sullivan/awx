import React from 'react';

import { createMemoryHistory } from 'history';
import { mountWithContexts } from '../../../../testUtils/enzymeHelpers';
import ProjectJobTemplatesListItem from './ProjectJobTemplatesListItem';

describe('<ProjectJobTemplatesListItem />', () => {
  test('launch button shown to users with start capabilities', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  start: true,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('LaunchButton').exists()).toBeTruthy();
  });

  test('launch button hidden from users without start capabilities', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  start: false,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('LaunchButton').exists()).toBeFalsy();
  });

  test('edit button shown to users with edit capabilities', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  edit: true,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('PencilAltIcon').exists()).toBeTruthy();
  });

  test('edit button hidden from users without edit capabilities', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('PencilAltIcon').exists()).toBeFalsy();
  });

  test('missing resource icon is shown.', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(true);
  });

  test('missing resource icon is not shown when there is a project and an inventory.', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
                project: { name: 'Foo', id: 2 },
                inventory: { name: 'Bar', id: 2 },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });

  test('missing resource icon is not shown when inventory is prompt_on_launch, and a project', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              ask_inventory_on_launch: true,
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
                project: { name: 'Foo', id: 2 },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });
  test('missing resource icon is not shown type is workflow_job_template', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'workflow_job_template',
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
              },
            }}
          />
        </tbody>
      </table>
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });
  test('clicking on template from project templates list navigates properly', () => {
    const history = createMemoryHistory({
      initialEntries: ['/projects/1/job_templates'],
    });
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            detailUrl="/templates/job_template/2/details"
            template={{
              id: 2,
              name: 'Template 2',
              summary_fields: {
                user_capabilities: {
                  edit: false,
                },
              },
            }}
          />
        </tbody>
      </table>,
      { context: { router: { history } } }
    );
    wrapper.find('Link').simulate('click', { button: 0 });
    expect(history.location.pathname).toEqual(
      '/templates/job_template/2/details'
    );
  });

  test('should render warning about missing execution environment', () => {
    const wrapper = mountWithContexts(
      <table>
        <tbody>
          <ProjectJobTemplatesListItem
            isSelected={false}
            template={{
              id: 1,
              name: 'Template 1',
              url: '/templates/job_template/1',
              type: 'job_template',
              summary_fields: {
                user_capabilities: {
                  edit: true,
                },
              },
              custom_virtualenv: '/var/lib/awx/env',
              execution_environment: null,
            }}
          />
        </tbody>
      </table>
    );

    expect(
      wrapper.find('.missing-execution-environment').prop('content')
    ).toEqual(
      'Custom virtual environment /var/lib/awx/env must be replaced by an execution environment.'
    );
  });
});
