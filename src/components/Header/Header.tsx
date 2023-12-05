import { Link } from 'react-router-dom';
import { setLabelAC, setQueryAC } from '../../redux/filtersReducer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { typeOptions } from '../../utils/helpers';
import './Header.scss';

export const Header = () => {
  const { label, query } = useAppSelector(state => state.filters);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="header-contain">
        <Link to="/" className="logo-link">
          <span className="logo">Calendar</span>
        </Link>

        <div className="header-filters">
          <div className="header-filter">
            <input
              type="text"
              placeholder="Search tasks..."
              value={query}
              onChange={e => dispatch(setQueryAC(e.target.value))}
            />
          </div>

          <div className="header-filter">
            <select value={label} onChange={e => dispatch(setLabelAC(e.target.value))}>
              <option value="all">
                Filter tasks
              </option>

              {typeOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
