import { ConfigEditorFactory } from 'stryker-api/config';
import JestConfigEditor from './JestConfigEditor';

ConfigEditorFactory.instance().register('jest', JestConfigEditor);