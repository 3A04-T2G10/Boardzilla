import React,  { useState, useEffect , useCallback} from "react";
import {Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { useDispatch, useSelector }from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Sticky from "_widgets/StickyNotes/Sticky";
import Stock from "_widgets/Stock/Stock";
import { attemptGetStickies, attemptUpdateStickyLayout } from "_thunks/stickies";
import { attemptGetStocks, attemptUpdateStockLayout } from "_thunks/stocks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import AddStickyModal from "_widgets/StickyNotes/AddStickyModal";
import AddNewsModal from "_widgets/News/AddNewsModal";
import AddStockModal from "_widgets/Stock/AddStockModal";
import AddWeatherModal from "_widgets/Weather/AddWeatherModal";

export const WidgetList = () => {
  const [layouts, setLayouts] = useState([]);
  const [widgetCounter, setWidgetCounter] = useState(0);
  const [newWidgetType, setNewWidgetType] = useState("Sticky");
  const [addStickyWidget, setAddStickyWidget] = useState(false);
  const [addNewsWidget, setAddNewsWidget] = useState(false);
  const [addStockWidget, setAddStockWidget] = useState(false);
  const [addWeatherWidget, setAddWeatherWidget] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { stocks } = useSelector(R.pick(["stocks"]));
  const { stickies } = useSelector(R.pick(["stickies"]));
  const [difference, setDifference] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [added, setAdded] = useState(false);

  const setAllLayouts = useCallback(() => {
    const allLayouts = [];
    stickies.map(sticky => {
      const newWidget = {
        i: sticky.id,
        x: sticky.x, // 3 is the multiplier
        y: sticky.y, // puts it at the bottom
        w: sticky.width,
        h: sticky.height,
        minH: 2,
        minW: 4
        };
      
      allLayouts.push(newWidget);
      }
  )
  
  stocks.map(stock=> {
    const newWidget = {
      i: stock.id,
      x: stock.x, // 3 is the multiplier
      y: stock.y, // puts it at the bottom
      w: stock.width,
      h: stock.height,
      minH: 4,
      minW: 8
      };
    
    allLayouts.push(newWidget);
    }
  )
      setLayouts(allLayouts);
  });
  

  useEffect(() => {
    if (newWidgetType === "Sticky" && stickies.length > 0){
    const newWidget = {
      i: stickies[stickies.length-1].id,
      x: stickies[stickies.length-1].x, // 3 is the multiplier
      y: stickies[stickies.length-1].y, // puts it at the bottom
      w: stickies[stickies.length-1].width,
      h: stickies[stickies.length-1].height,
      minH: 2,
      minW: 4
      };
      const allLayouts = Array.from(layouts);
      allLayouts.push(newWidget);
      setLayouts(allLayouts);
    } else if (newWidgetType=== "Stocks" && stocks.length > 0) {
      const newWidget = {
        i: stocks[stocks.length-1].id,
        x: stocks[stocks.length-1].x, // 3 is the multiplier
        y: stocks[stocks.length-1].y, // puts it at the bottom
        w: stocks[stocks.length-1].width,
        h: stocks[stocks.length-1].height,
        minH: 4,
        minW: 8
        };
        const allLayouts = Array.from(layouts);
        allLayouts.push(newWidget);
        setLayouts(allLayouts);
    }
  }, [added])

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      const stickyWidgets = dispatch(attemptGetStickies());
      const stocksWidgets = dispatch(attemptGetStocks());
      Promise.allSettled([stickyWidgets, stocksWidgets]).then(() => {setAllLayouts(); setLoading(false)});
      // dispatch(attemptGetStocks()).then(() => {console.log(stocks); setAllLayouts(); setLoading(false); });
      
    }
  }, []);

    useEffect (() => {
      setWidgetCounter(layouts.length);
    }, [layouts])


  const onLayoutChange = useCallback((layout) =>  {
    let differentLayout = layout.filter((newLayout,index) => {
      //console.log(newLayout);
      if ((layouts[index].x !== newLayout.x) || (layouts[index].y !== newLayout.y) 
      || (layouts[index].w !== newLayout.w) || (layouts[index].h !== newLayout.h)) {
        return newLayout;
      }
    });
    
    var updated = 0;
    console.log(differentLayout);
    const newArray = Array.from(difference);
    differentLayout.map(newDifferentLayout => {
      var foundLayout = 0;
      difference.map((existingDifferentLayouts, index) => {
        if (newDifferentLayout.i === existingDifferentLayouts.i){
          newArray[index] = newDifferentLayout
          foundLayout = 1;
          updated = 1;
        }
      });
      if (foundLayout == 0) {
        newArray.push(newDifferentLayout);
        updated = 1;
      }
    });

    setDifference(newArray);

    if (updated == 1) {

    setDisabled(false);
    }

    setLayouts(layout);
  }
  );

  const selectType = useCallback((e) => {
    setNewWidgetType(e.target.value);
  });

 const add = useCallback(() => {
    switch (newWidgetType) {
      case "Sticky":
        setAddStickyWidget(true);
        break;
      case "News":
        setAddNewsWidget(true);
        break;
      case "Stock":
        setAddStockWidget(true);
        break;
      case "Weather":
        setAddWeatherWidget(true);
        break;
      default:
        return;
    }
  });

  const save = useCallback(() => {
    difference.map(newLayout => {
      console.log(newLayout);
      if (stickies.filter(sticky => newLayout.i == sticky.id).length == 1){
        dispatch(attemptUpdateStickyLayout(newLayout.i, newLayout.x, newLayout.y, newLayout.w, newLayout.h));
      } else if(stocks.filter(stock => newLayout.i == stock.id).length == 1) {
        dispatch(attemptUpdateStockLayout(newLayout.i, newLayout.x, newLayout.y, newLayout.w, newLayout.h));
      }
    });
    setDifference([]);
    setDisabled(true);
  })
 const closeModal = useCallback(() => {
    setAddStickyWidget(false);
    setAddStockWidget(false);
    setAddNewsWidget(false);
    setAddWeatherWidget(false);
  });

  const widgetCount = useCallback(() => {
    setWidgetCounter(prevState => prevState + 1);
  });

  const widgetCountStock = useCallback(() => {
    setWidgetCounter(prevState => prevState + 2);
  });

  const updateList = useCallback(() => {
    setAdded(!added);
  });


    return (
      !loading && (
      <>
        <AddStickyModal
          open={addStickyWidget}
          closeModal={closeModal}
          widgetCount={widgetCount}
          x={(widgetCounter * 4) % 12}
          y={Math.floor((widgetCounter * 4) / 12)}
          updateList={updateList}
        />

        <AddNewsModal
          open={addNewsWidget}
          closeModal={closeModal}
          widgetCount={widgetCount}
          x={(widgetCounter * 4) % 12}
          y={Math.floor((widgetCounter * 4) / 12)}
          updateList={updateList}
        />

        <AddStockModal
          open={addStockWidget}
          closeModal={closeModal}
          widgetCount={widgetCountStock}
          x={(widgetCounter * 4) % 12}
          y={Math.floor((widgetCounter * 4) / 12)}
          updateList={updateList}
        />

        <AddWeatherModal
          open={addWeatherWidget}
          closeModal={closeModal}
          widgetCount={widgetCount}
          x={(widgetCounter * 4) % 12}
          y={Math.floor((widgetCounter * 4) / 12)}
          updateList={updateList}
        />
        <div
          style={{
            width: `100%`,
            height: `50px`,
          }}>
          {/* <!-- Main container --> */}
          <div className="level px-5">
            {/* <!-- Left side --> 
    use these links to filter only a specific type of widget
  
  */}
            <div className="level-left">
              <p className="level-item">
                <strong>
                  <a>All</a>
                </strong>
              </p>
              <p className="level-item">
                <a>Stickies</a>
              </p>
              <p className="level-item">
                <a>News</a>
              </p>
              <p className="level-item">
                <a>Weather</a>
              </p>
              <p className="level-item">
                <a>Stocks</a>
              </p>
              <p className="level-item">
                <a>Calendars</a>
              </p>
            </div>

            {/* <!-- Right side --> */}
            <div className="level-right">
              <div className="control mr-2">
                <div className="select">
                  <select
                    onChange={selectType}
                    value={newWidgetType}>
                    <option value="Sticky">Sticky</option>
                    <option value="News">News</option>
                    <option value="Weather">Weather</option>
                    <option value="Stock">Stock</option>
                    <option value="Calendar">Calendar</option>
                  </select>
                </div>
              </div>

              <p className="level-item">
                <button
                  className="button is-link is-rounded"
                  onClick={add}
                  >
                  <span className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </button>
              </p>
              <p className="level-item">
                <button
                  className="button is-link is-rounded"
                  onClick={save}
                  disabled={disabled}
                  >
                  <span className="icon">
                    <FontAwesomeIcon icon={faSave} />
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
        
        <ResponsiveReactGridLayout className="layout" onLayoutChange={onLayoutChange} >
          {layouts.map(widgetLayout => {
            
            const sticky = stickies.filter(sticky => sticky.id == widgetLayout.i)[0];
            
             const stock = stocks.filter(stock => stock.id == widgetLayout.i)[0];
            //console.log(stock);
            //console.log(sticky || stock);
            return (
            <div 
            style={{
              height: `100%`
            }}
            key={widgetLayout.i} 
            data-grid={widgetLayout}>
            {sticky && <Sticky key={sticky.id} {...sticky} />}
            {stock && <Stock key={stock.id} {...stock} />}
            </div>
            )
          })}
        </ResponsiveReactGridLayout>
        
      </>
      )
    );
}

export default WidgetList;
