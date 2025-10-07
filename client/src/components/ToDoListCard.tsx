import React from 'react';
import {
	MyCard,
	CardHeader,
	CardTitle,
  CardIcon,
	InsideCardContainer,
} from './CardComponents';
import styled from 'styled-components';
import plusIcon from '../assets/icons/plus.svg';
import trashIcon from '../assets/icons/remove.svg';


const TodoList = styled.ul`
	list-style: none;
	padding: 0;
	margin: 32px 0 0 0;
	width: 100%;
`;

const TodoItem = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 28px;
	font-family: ${(props) => props.theme.fonts.pixel};
	font-size: 1rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
	width: 24px;
	height: 24px;
	margin-right: 16px;
`;

const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: auto;
	padding-top: 16px;
`;

const FooterButton = styled.button`
	background: none;
	border: none;
	display: flex;
	align-items: center;
	font-family: ${(props) => props.theme.fonts.pixel};
	font-size: 1rem;
	color: ${(props) => props.theme.colors.black};
	cursor: pointer;
`;


const ToDoListCard: React.FC = () => {
	return (
		<MyCard primary style={{left: '100px'}}>
			<CardHeader>
				<CardTitle>TODO</CardTitle>
			</CardHeader>
			<InsideCardContainer style={{flexDirection: 'column'}}>
				<TodoList>
					<TodoItem>
						<Checkbox /> Go for a walk
					</TodoItem>
					<TodoItem>
						<Checkbox /> Go for a walk
					</TodoItem>
					<TodoItem>
						<Checkbox /> Go for a walk
					</TodoItem>
				</TodoList>
				<CardFooter>
						<FooterButton>
							<CardIcon src={plusIcon} alt="Add" style={{ marginRight: '6px' }} /> Add
					  </FooterButton>
					<CardIcon src={trashIcon} alt="Delete" />
				</CardFooter>
			</InsideCardContainer>
		</MyCard>
	);
};

export default ToDoListCard;
