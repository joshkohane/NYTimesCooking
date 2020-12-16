import SearchRecipes from './search_recipes'
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { saveThisRecipe, deleteThisSave } from '../../actions/save_actions';
import { fetchThisUser } from '../../actions/user_actions';
import { fetchOneRecipe, fetchEveryRecipe } from '../../actions/recipe_actions';
import { search, clearSearch } from '../../actions/recipe_actions';

const mapSTP = (state, ownProps) => {
    // debugger;
    return {
        searches: Object.values(state.entities.search),
        recipes: state.entities.recipes,
        loggedIn: Boolean(state.session.currentUser),
        isModalOpen: Boolean(state.ui.modal)
    }
}

const mapDTP = dispatch => ({
    saveThisRecipe: (recipeId) => dispatch(saveThisRecipe(recipeId)),
    deleteThisSave: (recipeId) => dispatch(deleteThisSave(recipeId)),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchThisUser: (userId) => dispatch(fetchThisUser(userId)),
    fetchOneRecipe: (recipeId) => dispatch(fetchOneRecipe(recipeId)),
    fetchEveryRecipe: () => dispatch(fetchEveryRecipe()),
    search: (query) => dispatch(search(query)),
    clearSearch: () => dispatch(clearSearch()),
})

export default connect(mapSTP, mapDTP)(SearchRecipes);
