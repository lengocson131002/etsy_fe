import { getAllShops } from '@/api/shop.api';
import { getTeam, removeTeam, updateTeam } from '@/api/team.api';
import MyButton from '@/components/basic/button';
import Table from '@/components/business/table';
import MyForm from '@/components/core/form';
import { Team } from '@/interface/team';
import { Button, Col, Empty, Modal, Row, Space, Tag, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FC, Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import './index.less';
import { Typography } from 'antd';
import ShopPage from '@/pages/shop';
import MyTabs from '@/components/business/tabs';
import StaffPage from '@/pages/staff';
import { useSelector } from 'react-redux';

const { Item: FilterItem } = Table.MyFilter;

const { Title, Text } = Typography;

interface TeamFormProps {
  teamId?: number;
  closeForm: () => void;
}
const TeamDetailForm: FC<TeamFormProps> = ({ teamId, closeForm }) => {
  const [team, setTeam] = useState<Team>();
  const [form] = useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const { loading } = useSelector(state => state.global);

  useEffect(() => {
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
    } else {
      setTeam(undefined);
    }
  }, [teamId]);

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

  const getTeamShops = useCallback(
    (params: any) => {
      return getAllShops({
        ...params,
        teamId: team?.id,
      });
    },
    [team],
  );

  return (
    <div>
      <MyForm<Team>
        className="form-update"
        form={form}
        onFinish={handleUpdateTeam}
        layout="vertical"
        style={{ maxWidth: 1000, margin: 'auto', width: '90%' }}
      >
        <Row gutter={[12, 0]}>
          <Col md={16} xs={24}>
            <MyForm.Item rules={[{ required: true }]} label="Name" name="name" type="input" initialValue={team?.name} />
          </Col>
          <Col md={8} xs={24}>
            <MyForm.Item label="Code" name="code" type="input" initialValue={team?.code} />
          </Col>
        </Row>
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
              Submit
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
                    <ShopPage teamId={team.id} />
                  </Suspense>
                ),
              },
              {
                label: 'Staffs',
                value: 'staff',
                children: (
                  <Suspense fallback={null}>
                    <StaffPage teamId={team.id} />
                  </Suspense>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default TeamDetailForm;
