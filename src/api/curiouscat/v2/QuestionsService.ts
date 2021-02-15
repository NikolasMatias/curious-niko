import api from '../../api_curiouscat';
import authorization from '../../authorization';

//authorization Basic token
class QuestionsService {
    public static getList({username, max_timestamp, _ob = 'noregisterOrSignin2'} : {username : string, max_timestamp? : string, _ob? : string}) {
        return api.get('v2.1/profile', {
            params: {
                username : username,
                max_timestamp : max_timestamp,
                _ob : _ob
            }

        })
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((errors) => {
                console.log(errors);
                return errors;
            });
    }

    public static profile ({_ob = 'noregisterOrSignin2'} : {_ob? : string}) {
        return api.get('v2/me', {
            params: {
                _ob : _ob
            },
            headers: {
                Authorization: authorization.basic_token
            }
        })
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((errors) => {
                console.log(errors);
                return errors;
            });
    }

    public static setQuestion({to, anon, question, in_response_to, _ob = 'noregisterOrSignin2'} : {to : string, anon : boolean, question : string, in_response_to : string, _ob : string}) {
        return api.post('v2/post/create', {
            to : to,
            anon : anon,
            question : question,
            in_response_to : in_response_to,
            _ob : _ob

        })
            .then((response) => {
            console.log(response);
            return response;
        })
            .catch((errors) => {
                console.log(errors);
                return errors;
            });
    }
}

export default QuestionsService