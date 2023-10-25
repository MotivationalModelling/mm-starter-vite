
import {useSelector} from 'react-redux';
import DataTable from "react-data-table-component";
import {useParams} from "react-router-dom";

import {User} from '../../models/user';
import {Project} from '../../models/project';
import {GoalModel} from '../../models/goalModel';
import {customStyles} from "../../components/Constants";

import {userColumns} from '../users/Constants';
import {projectColumns} from '../projects/Constants';
import {goalModelColumns} from '../goalModels/Constants';

import {selectSearchedProjects, selectSearchedUsers, selectSearchedGoalModels} from "./searchSlice";
import {useGetProjectsByNameQuery,
        useGetUsersByUsernameQuery,
        useGetGoalModelsByNameQuery} from '../../services/mme';

import ReturnToPrevPage from "./BackToPrev";

// ----- Implemented by MM Redback 2021  --------------------------------------------
// A search results component for searched users
// ---------------------------------------------------------------------------
 
const SearchUserResults = () =>{

    const canDelete = false; // useAppSelector(selectCurrentUserIsSuperuser);

    // Use useParams hook to get the username keyword searched
    const params: any = useParams();
    const username = params.username;

    // Retrieve queried user data by username from db
    useGetUsersByUsernameQuery(username);

    // Retrieve user data from redux state
    const {searchedUsers} = useSelector(selectSearchedUsers);

    return(
        <div className='ui container text-start p-2' style={{maxWidth: '95%'}}>

            {/* Search User Results*/}
            <DataTable<User>
                title="Search Users Results"
                data={searchedUsers}
                columns={userColumns}
                customStyles={customStyles}
                striped={true}
                pagination={true}
            />

            {/* A return-to-previous-page button*/}
            <ReturnToPrevPage></ReturnToPrevPage>
        </div>

    );
};

/**
 * A search results component for searched projects
 */
const SearchProjectResults = () =>{
    const params: any = useParams();
    const projectName = params.projectName;
    useGetProjectsByNameQuery(projectName);
    const {searchedProjects} = useSelector(selectSearchedProjects);

    // const [deleteProject] = useDeleteProjectMutation();

    return(
        <div className='ui container text-start p-2' style={{maxWidth: '70%'}}>
            <DataTable<Project> title='Projects'
                                data={searchedProjects}
                                columns={projectColumns} // does not include the "delete" button
                                customStyles={customStyles}
                                striped={true}
                                pagination={true}
            />
            <ReturnToPrevPage></ReturnToPrevPage>
        </div>

    );
};

// ---------------------------------------------------------------------------

/**
 * A search results component for searched goal models
 */
const SearchGoalModelResults = () =>{

    const canDelete = false;
    
    const params: any = useParams();
    const modelName = params.modelName;
    useGetGoalModelsByNameQuery(modelName);
    const {searchedGoalModels} = useSelector(selectSearchedGoalModels);

    return(
        <div className='ui container text-start p-2' style={{maxWidth: '80%'}}>
            <DataTable<GoalModel>
                title="Search Goal Models Results"
                data={searchedGoalModels}
                columns={goalModelColumns(canDelete)}
                customStyles={customStyles}
                striped={true}
                pagination={true}
            />
            <ReturnToPrevPage></ReturnToPrevPage>
        </div>

    );
};

// ---------------------------------------------------------------------------

export {SearchUserResults, SearchProjectResults, SearchGoalModelResults};

// ---------------------------------------------------------------------------
