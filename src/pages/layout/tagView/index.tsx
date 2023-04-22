import type { FC } from 'react';

import { Tabs } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { addTag, removeTag, setActiveTag } from '@/stores/tags-view.store';

import TagsViewAction from './tagViewAction';
import { TagItem } from '@/interface/layout/tagsView.interface';
import { normalize } from '@/utils/text';

const TagsView: FC = () => {
  const { tags, activeTagId } = useSelector(state => state.tagsView);
  const { menuList, locale } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // onClick tag
  const onChange = (key: string) => {
    const tag = tags.find(tag => tag.path === key);

    if (tag) {
      setCurrentTag(tag.path);
    }
  };

  // onRemove tag
  const onClose = (targetKey: string) => {
    dispatch(removeTag(targetKey));
  };

  const setCurrentTag = useCallback(
    (id?: string) => {
      const tag = tags.find(item => {
        if (id) {
          return item.path === id;
        } else {
          return item.path === location.pathname;
        }
      });

      if (tag) {
        dispatch(setActiveTag(tag.path));
      }
    },
    [dispatch, location.pathname, tags],
  );

  // useEffect(() => {
  //   navigate(activeTagId);
  // }, [activeTagId]);

  useEffect(() => {
    if (menuList.length) {
      const menu = menuList.find(m => m.path === location.pathname);

      if (menu) {
        dispatch(
          addTag({
            ...menu,
            closable: menu.code !== 'dashboard',
          }),
        );
      } else {
        const currentPath = location.pathname;
        const label = document.title ? document.title : normalize(currentPath, true);
        if (currentPath) {
          const tag: TagItem = {
            code: currentPath,
            label: {
              zh_CN: label,
              en_US: label,
            },
            path: currentPath,
            closable: true,
          };
          dispatch(addTag(tag));
        }
      }
    }
  }, [dispatch, location.pathname, menuList]);

  return (
    <div id="pageTabs" style={{ padding: '6px 4px' }}>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={onChange}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        onEdit={(targetKey, action) => action === 'remove' && onClose(targetKey as string)}
        tabBarExtraContent={<TagsViewAction />}
        items={tags.map(tag => {
          return {
            key: tag.path,
            closable: tag.closable,
            label: tag.label[locale],
          };
        })}
      />
    </div>
  );
};

export default TagsView;
