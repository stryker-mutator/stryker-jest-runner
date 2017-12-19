import DefaultConfigEditor, * as defaultConfigEditor from '../../src/configEditor/DefaultConfigEditor';
import ReactConfigEditor, * as reactConfigEditor from '../../src/configEditor/ReactConfigEditor';
import JestConfigEditor from '../../src/JestConfigEditor';
import { Config } from 'stryker-api/config';
import * as sinon from 'sinon';
import { assert } from 'chai';

describe('JestConfigEditor', () => {
  let jestConfigEditor: JestConfigEditor;
  let sandbox: sinon.SinonSandbox;

  let defaultConfigEditorStub: ConfigEditorStub;
  let reactConfigEditorStub: ConfigEditorStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    defaultConfigEditorStub = sinon.createStubInstance(DefaultConfigEditor);
    reactConfigEditorStub = sinon.createStubInstance(ReactConfigEditor);

    sandbox.stub(defaultConfigEditor, 'default').returns(defaultConfigEditorStub);
    sandbox.stub(reactConfigEditor, 'default').returns(reactConfigEditorStub);

    jestConfigEditor = new JestConfigEditor;
  });

  afterEach(() => sandbox.restore());

  it('should call the defaultConfigEditor edit method when no project is defined', () => {
    const config = new Config;

    jestConfigEditor.edit(config);

    assert(defaultConfigEditorStub.edit.calledWith(config), 'DefaultConfigEditor edit not called');
  });

  it('should call the reactConfigEditor edit method when react is defined as project', () => {
    const config = new Config;
    config.set({ jest: { project: 'React' } })

    jestConfigEditor.edit(config);

    assert(reactConfigEditorStub.edit.calledWith(config), 'ReactConfigEditor edit not called');
  });
});

interface ConfigEditorStub {
  edit: sinon.SinonStub;
}