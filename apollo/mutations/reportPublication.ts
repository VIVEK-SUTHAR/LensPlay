import { gql } from "@apollo/client";

export default gql`
	mutation ReportPublication($request: ReportPublicationRequest!) {
		reportPublication(request: $request)
	}
`;
