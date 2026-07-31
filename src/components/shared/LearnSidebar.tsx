import { useEffect, useState } from 'react'
import { NavLink, useMatch, useParams } from 'react-router-dom'
import {
  CATEGORY_GROUPS,
  categoriesInGroup,
  categoryHint,
  categoryLabel,
  groupLabel,
  type CategoryGroupId,
  type CategoryGroupMeta,
  type CategoryMeta,
} from '../../config/categories'
import {
  JLPT_LEVELS,
  jlptLevelLabel,
  type JlptLevel,
} from '../../config/vocabQuiz'
import { getLanguage, isTargetLang } from '../../config/languages'
import { t } from '../../config/uiStrings'
import { useSession } from '../../context/SessionContext'
import { getCategoryCount, getVocabManifest } from '../../data'
import type { LangCode, TargetLangCode } from '../../types/language'

const COLLAPSE_STORAGE_KEY = 'langstart.sidebarGroups'
const VOCAB_LEVEL_STORAGE_KEY = 'langstart.vocabLevelOpen'

function readCollapsedPrefs(): Partial<Record<CategoryGroupId, boolean>> {
  try {
    const raw = localStorage.getItem(COLLAPSE_STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<Record<CategoryGroupId, boolean>>
  } catch {
    return {}
  }
}

function writeCollapsedPrefs(prefs: Partial<Record<CategoryGroupId, boolean>>) {
  try {
    localStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

function readVocabLevelOpen(): Partial<Record<JlptLevel, boolean>> {
  try {
    const raw = localStorage.getItem(VOCAB_LEVEL_STORAGE_KEY)
    if (!raw) return { n5: true }
    return JSON.parse(raw) as Partial<Record<JlptLevel, boolean>>
  } catch {
    return { n5: true }
  }
}

function writeVocabLevelOpen(prefs: Partial<Record<JlptLevel, boolean>>) {
  try {
    localStorage.setItem(VOCAB_LEVEL_STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    /* ignore */
  }
}

export function LearnSidebar() {
  const { targetLang } = useParams()
  const { learnerLang } = useSession()
  const [collapsed, setCollapsed] = useState<Partial<Record<CategoryGroupId, boolean>>>(
    () => {
      const saved = readCollapsedPrefs()
      const initial: Partial<Record<CategoryGroupId, boolean>> = {}
      for (const group of CATEGORY_GROUPS) {
        initial[group.id] =
          saved[group.id] ?? Boolean(group.defaultCollapsed)
      }
      return initial
    },
  )

  useEffect(() => {
    writeCollapsedPrefs(collapsed)
  }, [collapsed])

  if (!targetLang || !isTargetLang(targetLang)) return null

  const target = getLanguage(targetLang)
  if (!target) return null

  const code = targetLang as TargetLangCode

  const toggleGroup = (id: CategoryGroupId) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
      <div className="learn-sidebar__head">
        <p className="learn-sidebar__lang-en">{target.englishName}</p>
        <h1 className="learn-sidebar__lang">{target.nativeName}</h1>
      </div>

      <nav className="learn-sidebar__nav" aria-label={t(learnerLang, 'categories')}>
        <NavLink
          to={`/${targetLang}`}
          end
          className={({ isActive }) =>
            `learn-sidebar__link${isActive ? ' is-active' : ''}`
          }
        >
          <span>{t(learnerLang, 'overview')}</span>
        </NavLink>

        {CATEGORY_GROUPS.map((group) => (
          <SidebarGroup
            key={group.id}
            group={group}
            code={code}
            learnerLang={learnerLang}
            targetLang={targetLang}
            collapsed={Boolean(collapsed[group.id])}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </nav>
    </>
  )
}

function SidebarGroup({
  group,
  code,
  learnerLang,
  targetLang,
  collapsed,
  onToggle,
}: {
  group: CategoryGroupMeta
  code: TargetLangCode
  learnerLang: LangCode
  targetLang: string
  collapsed: boolean
  onToggle: () => void
}) {
  const items = categoriesInGroup(group.id, code)
  const panelId = `sidebar-group-${group.id}`

  return (
    <div className={`learn-sidebar__group${collapsed ? ' is-collapsed' : ''}`}>
      <button
        type="button"
        className="learn-sidebar__section"
        aria-expanded={!collapsed}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{groupLabel(group, learnerLang)}</span>
        <span className="learn-sidebar__chev" aria-hidden>
          {collapsed ? '▸' : '▾'}
        </span>
      </button>

      {!collapsed && (
        <div id={panelId} className="learn-sidebar__group-body">
          {items.length === 0 ? (
            <p className="learn-sidebar__empty">{t(learnerLang, 'comingSoon')}</p>
          ) : (
            items.map((category) => (
              <CategoryNavItem
                key={category.id}
                category={category}
                code={code}
                learnerLang={learnerLang}
                targetLang={targetLang}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function CategoryNavItem({
  category,
  code,
  learnerLang,
  targetLang,
}: {
  category: CategoryMeta
  code: TargetLangCode
  learnerLang: LangCode
  targetLang: string
}) {
  const count = getCategoryCount(code, category.id)
  const hint = categoryHint(category, code, learnerLang)
  const enabled = count > 0
  const label = categoryLabel(category, learnerLang)

  if (category.id === 'vocab' && code === 'ja' && enabled) {
    return (
      <VocabJlptNav
        category={category}
        learnerLang={learnerLang}
        targetLang={targetLang}
        label={label}
        hint={hint}
      />
    )
  }

  if (!enabled) {
    return (
      <span
        className="learn-sidebar__link learn-sidebar__link--disabled"
        aria-disabled="true"
      >
        <span className="learn-sidebar__step">{category.step}</span>
        <span className="learn-sidebar__link-body">
          <span>{label}</span>
          {hint && <span className="learn-sidebar__hint">{hint}</span>}
        </span>
        <span className="learn-sidebar__soon">{t(learnerLang, 'comingSoon')}</span>
      </span>
    )
  }

  return (
    <NavLink
      to={`/${targetLang}/${category.id}`}
      className={({ isActive }) =>
        `learn-sidebar__link learn-sidebar__link--row${isActive ? ' is-active' : ''}`
      }
    >
      <span className="learn-sidebar__step">{category.step}</span>
      <span className="learn-sidebar__link-body">
        <span>{label}</span>
        {hint && <span className="learn-sidebar__hint">{hint}</span>}
      </span>
    </NavLink>
  )
}

function VocabJlptNav({
  category,
  targetLang,
  label,
  hint,
}: {
  category: CategoryMeta
  learnerLang: LangCode
  targetLang: string
  label: string
  hint?: string
}) {
  const match = useMatch(`/${targetLang}/vocab/:jlptLevel/:day`)
  const activeLevel = parseLevel(match?.params.jlptLevel)
  const activeDay = Number(match?.params.day) || null
  const manifest = getVocabManifest()
  const [openLevels, setOpenLevels] = useState<Partial<Record<JlptLevel, boolean>>>(
    () => {
      const saved = readVocabLevelOpen()
      if (activeLevel) return { ...saved, [activeLevel]: true }
      return saved
    },
  )

  useEffect(() => {
    if (activeLevel) {
      setOpenLevels((prev) => {
        if (prev[activeLevel]) return prev
        const next = { ...prev, [activeLevel]: true }
        writeVocabLevelOpen(next)
        return next
      })
    }
  }, [activeLevel])

  const toggleLevel = (level: JlptLevel) => {
    setOpenLevels((prev) => {
      const next = { ...prev, [level]: !prev[level] }
      writeVocabLevelOpen(next)
      return next
    })
  }

  return (
    <div className="learn-sidebar__branch">
      <div
        className={`learn-sidebar__link learn-sidebar__link--row learn-sidebar__link--parent${activeLevel ? ' is-active' : ''}`}
      >
        <span className="learn-sidebar__step">{category.step}</span>
        <span className="learn-sidebar__link-body">
          <span>{label}</span>
          {hint && <span className="learn-sidebar__hint">{hint}</span>}
        </span>
      </div>

      <div className="learn-sidebar__jlpt">
        {JLPT_LEVELS.map((level) => {
          const days = manifest.levels[level]?.days ?? 0
          const open = Boolean(openLevels[level])
          return (
            <div key={level} className="learn-sidebar__jlpt-level">
              <button
                type="button"
                className={`learn-sidebar__jlpt-toggle${activeLevel === level ? ' is-current' : ''}`}
                aria-expanded={open}
                onClick={() => toggleLevel(level)}
              >
                <span>{jlptLevelLabel(level)}</span>
                <span className="learn-sidebar__jlpt-meta">
                  {days}d · {manifest.levels[level]?.words ?? 0}
                </span>
                <span aria-hidden>{open ? '▾' : '▸'}</span>
              </button>
              {open && (
                <div className="learn-sidebar__sub learn-sidebar__sub--days">
                  {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                    <NavLink
                      key={day}
                      to={`/${targetLang}/vocab/${level}/${day}`}
                      className={() =>
                        `learn-sidebar__sublink${
                          activeLevel === level && activeDay === day
                            ? ' is-active'
                            : ''
                        }`
                      }
                    >
                      {day}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function parseLevel(value: string | undefined): JlptLevel | null {
  if (!value) return null
  const v = value.toLowerCase()
  return (JLPT_LEVELS as string[]).includes(v) ? (v as JlptLevel) : null
}
