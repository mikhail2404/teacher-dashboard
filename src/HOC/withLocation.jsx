import {useLocation, withRouter} from 'react-router-dom';

export const withLocation = (WrappedComponent) => {
    const WithLocation = (props) => {
        const location = useLocation();
        return <WrappedComponent {...props} location={location} />;
    };
    return withRouter(WithLocation);
};