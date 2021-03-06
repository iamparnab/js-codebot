import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import { connect } from 'react-redux';

import './styles.css';
import { Props } from './models';
import { StoreType } from '../../store/model';
import { DEBOUNCE_TIME, DEFAULT_CODE } from '../../constants';
import { setCode, applyChanges } from '../../actions';
import { BrowserStorage, Debouncer } from '../../utils';

class MonacoWrapper extends React.Component<Props> {
  debouncer: Debouncer;

  constructor(props: Props) {
    super(props);
    this.debouncer = new Debouncer(DEBOUNCE_TIME);
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedTabId !== prevProps.selectedTabId) {
      BrowserStorage.set(`tabId_${prevProps.selectedTabId}`, this.props.code);

      let currentCode = BrowserStorage.get(`tabId_${this.props.selectedTabId}`);
      if (currentCode === null) {
        currentCode = DEFAULT_CODE;
      }

      this.props.setCode(currentCode);
    }
  }
  componentDidMount() {
    this.props.setCode(DEFAULT_CODE);
    /**
     * At landing, do not show Apply
     * changes notification.
     */
    this.props.applyChanges(true);
  }

  handleEditorChange = (_: any, value: string | undefined) => {
    /**
     * No need to update in every change
     */
    this.debouncer.execute(() => {
      this.props.setCode(value || '');
    });
  };

  render() {
    return (
      <div className="ap-mw-w">
        <ControlledEditor
          height="90vh"
          language="javascript"
          theme="vs-light"
          value={this.props.code}
          onChange={this.handleEditorChange}
          options={{
            fontSize: '16px',
            fontWeight: 'bold',
            renderWhitespace: 'all',
          }}
        />
      </div>
    );
  }
}

export default connect(
  (store: StoreType) => ({
    selectedTabId: store.selectedTabId,
    code: store.code,
  }),
  { setCode, applyChanges }
)(MonacoWrapper);
