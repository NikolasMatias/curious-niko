import api from '../../api_curiouscat';
import authorization from '../../authorization';
import Profile from "../../../../models/Profile";

//authorization Basic token
class QuestionsService {
    public static getList({username, max_timestamp, _ob = 'noregisterOrSignin2'} : {username : string, max_timestamp? : string, _ob? : string}): Promise<Profile> {
        return new Promise((resolve, reject) => {
            return api.get('v2.1/profile', {
                params: {
                    username : username,
                    max_timestamp : max_timestamp,
                    _ob : _ob
                }

            })
                .then((response) => {
                    if (response.data.error === 404) {
                        reject(response)
                    }

                    resolve(response.data)
                })
        })
    }

    public static profile ({_ob = 'noregisterOrSignin2'} : {_ob? : string}) {
        return api.get('v2/me', {
            params: {
                _ob : _ob
            },
            headers: {
                Authorization: authorization['basic_token_curiouscat']
            }
        })
            .then((response) => {
                return response;
            })
            .catch((errors) => {
                return errors;
            });
    }

    public static setQuestion({to, anon, question, in_response_to, _ob = 'noregisterOrSignin2', authorization_key, authorization_boolean}
    : {to : string|null|undefined, anon : boolean, question : string, in_response_to? : string, _ob? : string, authorization_key? : string, authorization_boolean? : boolean}) {
        let formData = new FormData();
        formData.append('to', to || '');
        formData.append('anon', anon.toString());
        formData.append('question', question);
        formData.append('in_response_to', in_response_to ?? 'undefined');
        formData.append('_ob', _ob);

        /*let e = {
            to : to,
            anon : anon,
            question : question,
            in_response_to : in_response_to ?? 'undefined',
            _ob : _ob

        };*/

        return api.post('v2/post/create', formData, {
            headers: {
                'Authorization': authorization_boolean ? (typeof authorization_key === 'string' ? authorization_key : authorization.basic_token_curiouscat) : ''
            }
        })
            .then((response) => {
                return {dados: response.data, status: response.status};
        })
            .catch((errors) => {
                return errors;
            });
    }
}

export default QuestionsService