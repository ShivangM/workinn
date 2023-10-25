import { Skill } from '@/interfaces/user';
import fetchSkills from '@/lib/profile/fetchSkills';
import { redirect } from 'next/navigation';
import React from 'react';
import AddSkillButton from './AddSkillButton';
import DeleteSkillButton from './DeleteSkillButton';
import EditSkillButton from './EditSkillButton';

type SkillCardProps = {
  skill: Skill;
  viewOnly: boolean;
};

const SkillCard = ({ skill, viewOnly }: SkillCardProps) => {
  return (
    <div key={skill.id} className="flex flex-col bg-gray-100 rounded-lg p-4">
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{skill.name}</h3>

          {viewOnly ? null : (
            <div className="flex items-center space-x-2">
              <EditSkillButton skill={skill} />
              <DeleteSkillButton skill={skill} />
            </div>
          )}
        </div>

        <span className="text-sm text-gray-500">{skill.level}</span>
      </div>
    </div>
  );
};

type SkillsProps = {
  viewOnly: boolean;
  userId?: string;
};

const Skills = async ({ viewOnly, userId }: SkillsProps) => {
  let skills = null;

  try {
    const { data } = await fetchSkills(userId);
    skills = data;
  } catch (error) {
    redirect('/signin');
  }

  return (
    <section title="Skill" className="profile-section">
      <div className="flex item-center justify-between">
        <h2>Skill</h2>
        {viewOnly ? null : <AddSkillButton />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {skills && skills.length > 0 ? (
          skills.map((skill) => (
            <SkillCard viewOnly={viewOnly} skill={skill} key={skill.id} />
          ))
        ) : (
          <h3 className="text-gray-600">No skills added</h3>
        )}
      </div>
    </section>
  );
};

export default Skills;
