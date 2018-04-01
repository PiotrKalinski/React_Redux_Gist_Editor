import * as gist from '../../actions/gist.js';
import * as gistActions from '../../consts/gist-actions';
const payload1 = 'asdasd';

describe('xD  test ', () => {
it('shoud create an action to set payload,', ()=> {
    const selectedGist = payload1;
    const payload = {
        selectedGist,
        type: gistActions.SELECT
    };
    expect(gist.selectGist(selectedGist)).toEqual(payload);
});
});
