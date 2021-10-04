import api from '../../api_quizzapi';

class QuestionsService {
    public static getList({limit, category, dificulty, tags} : {limit : number, category : string, dificulty : string, tags  : string}) {
        return api.get('/questions', {
            params: {
                limit: limit,
                category: category,
                dificulty: dificulty
            }
        }).then((response) => {
            console.log(response);
            return {dados: response.data, status: response.status}
        }).catch((errors) => {
            console.log(errors);
            return errors;
        });
    }
}

export default QuestionsService;