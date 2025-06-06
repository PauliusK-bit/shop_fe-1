import { Link } from "react-router";
import { CategoryProps } from "./types";
import styled from "styled-components";

const ModernLink = styled(Link)`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  font-size: 16px;
  color: #1d4ed8;
  text-decoration: none;
  border: 2px solid #1d4ed8;
  border-radius: 8px;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;

  &:hover {
    background-color: #3b82f6;
    color: #ffffff;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CategoryItem = ({ data }: CategoryProps) => {
  const { title, _id } = data;

  return (
    <>
      <div>
        <h2>
          <ModernLink className="link-accent" to={`/categories/${_id}`}>
            {title}
          </ModernLink>
        </h2>
      </div>
    </>
  );
};

export default CategoryItem;
