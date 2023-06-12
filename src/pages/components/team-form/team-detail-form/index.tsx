import { getAllShops } from '@/api/shop.api';
import {
  addShopsToTeam,
  addStaffsToTeam,
  getTeam,
  removeShopFromTeam,
  removeShopsFromTeam,
  removeStaffsFromTeam,
  removeTeam,
  updateTeam,
} from '@/api/team.api';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { Team } from '@/interface/team';
import { Button, Col, Drawer, Empty, Modal, Row, Space, Tag, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './index.less';
import ShopPage from '@/pages/shop';
import MyTabs from '@/components/business/tabs';
import StaffPage from '@/pages/staff';
import { useParams } from 'react-router-dom';
import TeamShops from '@/pages/components/team-form/team-detail-form/team-shops';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { getAllStaffs } from '@/api/staff.api';
import TeamStaffs from './team-staff';
import { RefTableProps } from '@/components/business/table';

interface TeamFormProps {
  closeForm: () => void;
  shopsOpen: boolean;
  closeShops: () => void;
  staffsOpen: boolean;
  closeStaffs: () => void;
}
const TeamDetailForm: FC<TeamFormProps> = ({ closeForm, shopsOpen, staffsOpen, closeShops, closeStaffs }) => {
  const [team, setTeam] = useState<Team>();
  const [form] = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [addedShopIds, setAddedShopIds] = useState<string[]>([]);
  const [addedStaffIds, setAddedStaffIds] = useState<number[]>([]);

  const [removedShopIds, setRemovedShopIds] = useState<string[]>([]);
  const [removedStaffIds, setRemovedStaffIds] = useState<number[]>([]);

  const { id } = useParams();

  const shopRef = useRef<RefTableProps>(null);
  const staffRef = useRef<RefTableProps>(null);

  useEffect(() => {
    const teamId = id ? Number.parseInt(id) : undefined;
    if (teamId) {
      const loadTeamData = async (teamId: number) => {
        getTeam(teamId)
          .then(res => {
            const { result, status } = res;
            if (status && result) {
              setTeam(result);
            }
          })
          .catch(ex => {
            closeForm();
          });
      };
      loadTeamData(teamId);
    }
  }, [id]);

  useEffect(() => {
    if (team) {
      form.resetFields();
    }
  }, [team]);

  const handleUpdateTeam = async (values: any) => {
    if (!team) {
      return;
    }

    const data = {
      name: values?.name,
      code: values?.code,
      description: values?.description,
    };

    const { result, status } = await updateTeam(team.id, data);
    if (result?.status && status) {
      message.success('Update team successfully');
      closeForm();
    }
  };

  const handleRemoveTeam = async () => {
    if (!team?.id) {
      return;
    }

    const { result, status } = await removeTeam(team.id);
    if (result?.status && status) {
      message.success('Remove team successfully');
      closeForm();
      setModalOpen(false);
    }
  };

  const addShops = async () => {
    if (!team || addedShopIds?.length === 0) {
      return;
    }
    const { result, status } = await addShopsToTeam(team.id, addedShopIds);
    if (status && result?.status) {
      message.success('Add shops to team successfully');
      setAddedShopIds([]);
      closeShops();
      shopRef.current?.load();
    }
  };

  const removeShops = async () => {
    if (!team || removedShopIds?.length === 0) {
      return;
    }

    const { result, status } = await removeShopsFromTeam(team.id, removedShopIds);
    if (status && result?.status) {
      message.success('Remove shops from team successfully');
      setRemovedShopIds([]);
      shopRef.current?.load();
    }
  };

  const addStaffs = async () => {
    if (!team || addedStaffIds?.length === 0) {
      return;
    }

    const { result, status } = await addStaffsToTeam(team.id, addedStaffIds);
    if (status && result?.status) {
      message.success('Add staff to team successfully');
      setAddedStaffIds([]);
      closeStaffs();
      staffRef.current?.load();
    }
  };

  const removeStaffs = async () => {
    if (!team || removedStaffIds?.length === 0) {
      return;
    }

    const { result, status } = await removeStaffsFromTeam(team.id, removedStaffIds);
    if (status && result?.status) {
      message.success('Remove staffs to team successfully');
      setRemovedStaffIds([]);
      closeStaffs();
      staffRef.current?.load();
    }
  };

  const getShops = useCallback(
    async (params: any) => {
      params = {
        ...params,
        teamIds: team ? [team.id] : null,
      };
      return await getAllShops(params);
    },
    [team],
  );

  const getNewShops = useCallback(
    async (params: any) => {
      params = {
        ...params,
        exceptTeamIds: team ? [team?.id] : null,
      };
      return await getAllShops(params);
    },
    [team],
  );

  const getStaffs = useCallback(
    async (params: any) => {
      params = {
        ...params,
        teamIds: team ? [team.id] : null,
      };
      return await getAllStaffs(params);
    },
    [team],
  );

  const getNewStaffs = useCallback(
    async (params: any) => {
      params = {
        ...params,
        exceptTeamIds: team ? [team.id] : null,
      };
      return await getAllStaffs(params);
    },
    [team],
  );

  return (
    <div>
      {team ? (
        <div>
          <MyForm<Team>
            className="form-update"
            form={form}
            onFinish={handleUpdateTeam}
            layout="vertical"
            style={{ maxWidth: 1000, margin: 'auto', width: '90%' }}
          >
            <MyForm.Item rules={[{ required: true }]} label="Name" name="name" type="input" initialValue={team?.name} />
            <MyForm.Item
              innerProps={{
                rows: 4,
              }}
              label="Description"
              name="description"
              type="text-area"
              initialValue={team?.description}
            />
            <Space>
              <MyForm.Item>
                <MyButton type="primary" htmlType="submit">
                  Save
                </MyButton>
                {team && (
                  <>
                    <MyButton danger onClick={() => setModalOpen(true)}>
                      Remove
                    </MyButton>
                    <Modal
                      title={'Delete team'}
                      open={modalOpen}
                      onOk={handleRemoveTeam}
                      onCancel={() => setModalOpen(false)}
                    >
                      <p>Do you want to remove this team?</p>
                    </Modal>
                  </>
                )}
              </MyForm.Item>
            </Space>
          </MyForm>

          {team && (
            <div className="shops-wrapper">
              <MyTabs
                type="card"
                defaultActiveKey={'listing'}
                options={[
                  {
                    label: 'Shops',
                    value: 'shop',
                    children: (
                      <Suspense fallback={null}>
                        <TeamShops
                          ref={shopRef}
                          shopQuery={getShops}
                          setSelectedIds={(ids: string[]) => setRemovedShopIds(ids)}
                          selectedIds={removedShopIds}
                        />
                        {removedShopIds.length > 0 && (
                          <Button danger onClick={removeShops}>
                            Remove {removedShopIds.length} shops from team
                          </Button>
                        )}
                      </Suspense>
                    ),
                  },
                  {
                    label: 'Staffs',
                    value: 'staff',
                    children: (
                      <Suspense fallback={null}>
                        <TeamStaffs
                          ref={staffRef}
                          staffQuery={getStaffs}
                          setSelectedIds={(ids: number[]) => setRemovedStaffIds(ids)}
                          selectedIds={removedStaffIds}
                        />
                        {removedStaffIds.length > 0 && (
                          <Button danger onClick={removeStaffs}>
                            Remove {removedStaffIds.length} staffs from team
                          </Button>
                        )}
                      </Suspense>
                    ),
                  },
                ]}
              />
            </div>
          )}

          <Drawer
            title="ADD SHOPS TO TEAM"
            width={window.innerWidth >= 700 ? 700 : window.innerWidth - 50}
            closable={true}
            onClose={closeShops}
            destroyOnClose={true}
            open={shopsOpen}
            extra={
              <>
                {addedShopIds.length > 0 && (
                  <Button type='primary' onClick={addShops}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AiOutlinePlusCircle /> Add {addedShopIds.length} shops to team
                    </div>
                  </Button>
                )}
              </>
            }
          >
            <TeamShops
              shopQuery={getNewShops}
              setSelectedIds={(ids: string[]) => setAddedShopIds(ids)}
              selectedIds={addedShopIds}
            />
          </Drawer>

          <Drawer
            title="ADD STAFFS TO TEAM"
            width={window.innerWidth >= 700 ? 700 : window.innerWidth - 50}
            closable={true}
            onClose={closeStaffs}
            destroyOnClose={true}
            open={staffsOpen}
            extra={
              <>
                {addedStaffIds.length > 0 && (
                  <Button type='primary' onClick={addStaffs}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <AiOutlinePlusCircle /> Add {addedStaffIds.length} staff to team
                    </div>
                  </Button>
                )}
              </>
            }
          >
            <TeamStaffs
              staffQuery={getNewStaffs}
              selectedIds={addedStaffIds}
              setSelectedIds={(ids: number[]) => setAddedStaffIds(ids)}
            />
          </Drawer>
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default TeamDetailForm;
